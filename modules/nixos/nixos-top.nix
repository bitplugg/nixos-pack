{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-top ];
}
