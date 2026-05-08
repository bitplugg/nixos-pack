{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-build-tui ];
}
