{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nixos-module-graph ];
}
