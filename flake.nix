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
      nixos-health = pkgs.callPackage ./pkgs/nixos-health {};
      nix-diff-lock = pkgs.callPackage ./pkgs/nix-diff-lock {};
      nixos-build-tui = pkgs.callPackage ./pkgs/nixos-build-tui {};
      system-report = pkgs.callPackage ./pkgs/system-report {};
      default = self.packages.${system}.nixos-module-graph;
    };

    overlays.default = final: prev: {
      brrtfetch = final.callPackage ./pkgs/brrtfetch {};
      rkn-block-checker = final.callPackage ./pkgs/rkn-block-checker {};
      nixos-module-graph = final.callPackage ./pkgs/nixos-module-graph {};
      nixos-health = final.callPackage ./pkgs/nixos-health {};
      nix-diff-lock = final.callPackage ./pkgs/nix-diff-lock {};
      nixos-build-tui = final.callPackage ./pkgs/nixos-build-tui {};
      system-report = final.callPackage ./pkgs/system-report {};
    };
  };
}
