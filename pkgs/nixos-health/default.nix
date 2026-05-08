{ lib, stdenv, bash, coreutils, gnugrep, gnused, systemd, nix }:

stdenv.mkDerivation {
  pname = "nixos-health";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash coreutils gnugrep gnused systemd nix ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-health $out/bin/nixos-health
    chmod +x $out/bin/nixos-health
    substituteInPlace $out/bin/nixos-health \
      --replace-fail '@coreutils@' '${coreutils}' \
      --replace-fail '@gnugrep@' '${gnugrep}' \
      --replace-fail '@gnused@' '${gnused}' \
      --replace-fail '@systemd@' '${systemd}' \
      --replace-fail '@nix@' '${nix}'
  '';

  meta = with lib; {
    description = "Quick NixOS system health checks";
    longDescription = ''
      Runs a battery of health checks: channel age, disk space,
      journal errors, swap usage, DNS resolution, and more.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-health";
    maintainers = with lib.maintainers; [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
