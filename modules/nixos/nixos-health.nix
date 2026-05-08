{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-health ];
}
