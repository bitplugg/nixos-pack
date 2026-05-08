{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-switch-diff ];
}
