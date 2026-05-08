{ lib, stdenv, bash }:

stdenv.mkDerivation {
  pname = "nixos-switch-diff";
  version = "0.1.0";

  src = ./.;

  buildInputs = [ bash ];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp nixos-switch-diff $out/bin/nixos-switch-diff
    chmod +x $out/bin/nixos-switch-diff
  '';

  meta = with lib; {
    description = "Show package diff between current and candidate system";
    longDescription = ''
      Builds a candidate and diffs its store paths against the current
      generation — shows what packages would be added, removed, or changed.
    '';
    homepage = "https://github.com/bitplugg/nixos-pack";
    license = licenses.mit;
    mainProgram = "nixos-switch-diff";
    maintainers = [{
      name = "bitplugg";
      email = "zxckillka.off@gmail.com";
    }];
    platforms = platforms.linux;
  };
}
