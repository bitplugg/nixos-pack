{ lib, stdenv, bash, coreutils }:

stdenv.mkDerivation {
  pname = "nixos-clean";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash coreutils ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-clean $out/bin/nixos-clean
    chmod +x $out/bin/nixos-clean
  '';

  meta = with lib; {
    description = "Nix store GC TUI with generation overview";
    longDescription = ''
      Shows a clean overview of generations and nix store size,
      then runs garbage collection with optional --dry-run or --full.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-clean";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
