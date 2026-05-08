{ lib, stdenv, python3 }:

stdenv.mkDerivation {
  pname = "nixos-flake-update";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ python3 ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-flake-update $out/bin/nixos-flake-update
    chmod +x $out/bin/nixos-flake-update
  '';

  meta = with lib; {
    description = "TUI for selectively updating flake inputs";
    longDescription = ''
      Interactive TUI that reads your flake.nix inputs, shows current
      locked revisions, and lets you pick which inputs to update.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-flake-update";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
