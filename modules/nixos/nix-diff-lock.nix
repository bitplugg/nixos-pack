{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.nix-diff-lock ];
}
