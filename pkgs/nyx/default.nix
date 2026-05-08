{ lib, stdenv, python3 }:

stdenv.mkDerivation {
  pname = "nyx";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ python3 ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nyx $out/bin/nyx
    chmod +x $out/bin/nyx

    mkdir -p $out/share/nyx
    cp -r examples $out/share/nyx/examples
    cp -r completions $out/share/nyx/completions
    if [ -d plugins ]; then
      mkdir -p $out/share/nyx/plugins
      cp -r plugins/*.nyx $out/share/nyx/plugins/
    fi
  '';

  meta = with lib; {
    description = "Plugin-based NixOS toolkit — zero alone, infinite with plugins";
    longDescription = ''
      nyx is a unified command interface for NixOS diagnostic and utility
      tools. It discovers .nyx plugins in bundled store path, ~/.config/nyx/plugins/
      and /etc/nyx/plugins/, and wraps installed nixos-pack tools as subcommands.

      Built-in commands: doctor, install, init, plugins.
      Bundled plugins in $out/share/nyx/plugins/.
      See example plugins in $out/share/nyx/examples/.
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
