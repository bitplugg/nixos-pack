{ lib, stdenv, python3 }:

stdenv.mkDerivation {
  pname = "nix-diff-lock";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ python3 ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nix-diff-lock $out/bin/nix-diff-lock
    chmod +x $out/bin/nix-diff-lock
  '';

  meta = with lib; {
    description = "Human-readable diff for flake.lock files";
    longDescription = ''
      Compares two flake.lock files and shows what inputs changed,
      what commits came in, and how many packages were added/removed.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nix-diff-lock";
    maintainers = with lib.maintainers; [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
