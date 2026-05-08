{ configFile ? null
, optionName ? null
, system ? "x86_64-linux"
}:

let
  nixpkgs = import <nixpkgs> {};
  lib = nixpkgs.lib;

  configModule = import configFile;

  eval = lib.evalModules {
    modules = [
      { _module.args = { modulesPath = "${toString nixpkgs.path}/nixos/modules"; }; }
      configModule
    ];
    specialArgs = {
      modulesPath = "${toString nixpkgs.path}/nixos/modules";
    };
  };

  opt = eval.options.${optionName} or null;
in
  if opt == null then {
    option = optionName;
    error = "Option not found";
    declarations = [];
    definitions = [];
    type = null;
    default = null;
    description = "";
  } else {
    option = optionName;
    declarations = opt.declarations or [];
    definitions = opt.definitions or [];
    type = if opt ? type then opt.type.description or "unknown" else null;
    default = opt.default or null;
    description = opt.description or "";
    readOnly = opt.readOnly or false;
    example = opt.example or null;
  }
