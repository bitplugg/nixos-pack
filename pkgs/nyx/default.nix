{ lib, stdenv, python3, makeWrapper }:

stdenv.mkDerivation {
  pname = "nyx";
  version = "0.1.0";

  src = ./.;

  nativeBuildInputs = [ makeWrapper ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nyx $out/bin/nyx
    chmod +x $out/bin/nyx
  '';

  meta = with lib; {
    description = "Plugin-based NixOS toolkit — zero alone, infinite with plugins";
    longDescription = ''
      nyx is a unified command interface for NixOS diagnostic and utility
      tools. By itself it does nothing — it discovers installed tools
      (nixos-health, nixos-module-graph, etc.) and exposes them as subcommands.
      Install any nixos-pack tool and nyx finds it automatically.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nyx";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
