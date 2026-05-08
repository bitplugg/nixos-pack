{
  description = "My custom Nix packages";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      brrtfetch = pkgs.callPackage ./pkgs/brrtfetch {};
      rkn-block-checker = pkgs.callPackage ./pkgs/rkn-block-checker {};
      nixos-module-graph = pkgs.callPackage ./pkgs/nixos-module-graph {};
      default = self.packages.${system}.nixos-module-graph;
    };

    overlays.default = final: prev: {
      brrtfetch = final.callPackage ./pkgs/brrtfetch {};
      rkn-block-checker = final.callPackage ./pkgs/rkn-block-checker {};
      nixos-module-graph = final.callPackage ./pkgs/nixos-module-graph {};
    };
  };
}
