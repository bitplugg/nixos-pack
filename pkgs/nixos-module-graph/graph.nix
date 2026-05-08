{ configFile ? null
, nixpkgsPath ? null
, system ? "x86_64-linux"
, maxDepth ? 100
}:

let
  nixpkgs = import <nixpkgs> {};
  lib = nixpkgs.lib;

  moduleArgs = {
    inherit lib;
    config = {};
    options = {};
    pkgs = nixpkgs;
    modulesPath = "${toString nixpkgs.path}/nixos/modules";
  };

  resolve = m:
    if builtins.isFunction m then m moduleArgs else m;

  walk = path: visited: depth:
    if depth > maxDepth then
      { file = path; options = []; imports = []; cycle = false; error = "max-depth"; }
    else
      let
        raw = import path;
        mod = resolve raw;
        modFile = if mod ? _file then mod._file else path;
      in
        if builtins.elem modFile visited then
          { file = modFile; options = []; imports = []; cycle = true; error = null; }
        else
          let
            impList = mod.imports or [];
            newVisited = [modFile] ++ visited;
            processed = builtins.filter (x: x != null) (
              builtins.map (imp: walkImport imp newVisited (depth + 1)) impList
            );
          in {
            file = modFile;
            options = builtins.attrNames (mod.options or {});
            imports = processed;
            cycle = false;
            error = null;
          };

  walkImport = imp: visited: depth:
    if builtins.isPath imp then
      let r = builtins.tryEval (walk (builtins.toString imp) visited depth);
      in if r.success then r.value
         else { file = builtins.toString imp; options = []; imports = []; cycle = false; error = "eval-error"; }
    else if builtins.isAttrs imp then
      let
        mod = resolve imp;
        modFile = mod._file or "anonymous";
      in
        if builtins.elem modFile visited then
          { file = modFile; options = []; imports = []; cycle = true; error = null; }
        else
          let
            impList = mod.imports or [];
            processed = builtins.filter (x: x != null) (
              builtins.map (imp: walkImport imp ([modFile] ++ visited) depth) impList
            );
          in {
            file = modFile;
            options = builtins.attrNames (mod.options or {});
            imports = processed;
            cycle = false;
            error = null;
          }
    else null;

  rootRaw = import configFile;
  rootMod = resolve rootRaw;
  rootFile = if rootMod ? _file then rootMod._file else configFile;
  rootImports = builtins.filter (x: x != null) (
    builtins.map (imp: walkImport imp [rootFile] 0) (rootMod.imports or [])
  );
in
  {
    file = rootFile;
    options = builtins.attrNames (rootMod.options or {});
    imports = rootImports;
    cycle = false;
    error = null;
  }
