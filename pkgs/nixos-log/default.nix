{ lib, stdenv, bash }:

stdenv.mkDerivation {
  pname = "nixos-log";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-log $out/bin/nixos-log
    chmod +x $out/bin/nixos-log
  '';

  meta = with lib; {
    description = "Journalctl browser with colored output";
    longDescription = ''
      Wraps journalctl with syntax highlighting for errors, warnings,
      and service events. Passes all flags through to journalctl.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-log";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
