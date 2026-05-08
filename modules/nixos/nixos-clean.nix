{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-clean ];
}
