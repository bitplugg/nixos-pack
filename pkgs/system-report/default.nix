{ lib, stdenv, python3, coreutils, gnugrep, gnused, systemd, nix }:

stdenv.mkDerivation {
  pname = "system-report";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ python3 coreutils gnugrep gnused systemd nix ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp system-report $out/bin/system-report
    chmod +x $out/bin/system-report
  '';

  meta = with lib; {
    description = "JSON system inventory: packages, services, ports, mounts";
    longDescription = ''
      Collects system information into a single JSON document:
      installed packages, enabled systemd units, open ports,
      filesystem mounts, kernel parameters, and hardware info.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "system-report";
    maintainers = with lib.maintainers; [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
