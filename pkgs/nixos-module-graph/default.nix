{ lib, stdenv, python3, nix }:

stdenv.mkDerivation {
  pname = "nixos-module-graph";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ python3 nix ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin $out/share/nixos-module-graph/static
    cp nixos-module-graph $out/bin/nixos-module-graph
    cp graph.nix option.nix $out/share/nixos-module-graph/
    cp static/index.html $out/share/nixos-module-graph/static/
    chmod +x $out/bin/nixos-module-graph
  '';

  meta = with lib; {
    description = "Visualise NixOS module import structure as interactive graphs";
    longDescription = ''
      nixos-module-graph analyses NixOS module imports and builds a directed
      acyclic graph (DAG) of module dependencies. Supports HTML (d3.js), DOT,
      JSON, and text output. Can trace specific option declarations across
      the module tree.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-module-graph";
    maintainers = with lib.maintainers; [{
      name = "bitplugg";
      email = "bitplugg@example.com";
    }];
    platforms = platforms.linux;
  };
}
