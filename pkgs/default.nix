{
  inputs,
  pkgs,
  system,
  ...
}:
{
#  _2048 = pkgs.callPackage ./2048 { stdenv = pkgs.gcc14Stdenv; };
#  maple-mono-custom = pkgs.callPackage ./maple-mono { inherit inputs; };
#  pomo = pkgs.callPackage ./pomo { };
  brrfetch = pkgs.callPackage ./brrfetch { };
  rkn-block-checker = pkgs.callPackage ./rkn-block-checker { };
  nixos-module-graph = pkgs.callPackage ./nixos-module-graph { };
  nixos-health = pkgs.callPackage ./nixos-health { };
  nix-diff-lock = pkgs.callPackage ./nix-diff-lock { };
  nixos-build-tui = pkgs.callPackage ./nixos-build-tui { };
  system-report = pkgs.callPackage ./system-report { };
}
