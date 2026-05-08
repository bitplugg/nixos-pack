{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-log ];
}
