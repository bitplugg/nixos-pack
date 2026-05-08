{ lib, stdenv, bash, coreutils, gnused, gnugrep, systemd, nix, nixos-rebuild }:

stdenv.mkDerivation {
  pname = "nixos-build-tui";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash coreutils gnused gnugrep systemd nix nixos-rebuild ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-build-tui $out/bin/nixos-build-tui
    chmod +x $out/bin/nixos-build-tui
    substituteInPlace $out/bin/nixos-build-tui \
      --replace-fail '@coreutils@' '${coreutils}' \
      --replace-fail '@nix@' '${nix}' \
      --replace-fail '@nixos-rebuild@' '${nixos-rebuild}/bin/nixos-rebuild'
  '';

  meta = with lib; {
    description = "Minimal TUI wrapper around nixos-rebuild";
    longDescription = ''
      Interactive wrapper with action selection, build log,
      rollback shortcut, and boot-entry management.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-build-tui";
    maintainers = with lib.maintainers; [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
