{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-flake-update ];
}
