{ lib, stdenv, bash, coreutils }:

stdenv.mkDerivation {
  pname = "nixos-top";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash coreutils ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-top $out/bin/nixos-top
    chmod +x $out/bin/nixos-top
  '';

  meta = with lib; {
    description = "Real-time system monitor: CPU, memory, systemd units, journal";
    longDescription = ''
      Live-updating dashboard showing load averages, memory usage,
      top systemd units by CPU, and recent journal errors.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-top";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
