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

    nixosModules = {
      nixos-module-graph = import ./modules/nixos/nixos-module-graph.nix;
      nixos-health = import ./modules/nixos/nixos-health.nix;
      nixos-build-tui = import ./modules/nixos/nixos-build-tui.nix;
      nix-diff-lock = import ./modules/nixos/nix-diff-lock.nix;
      system-report = import ./modules/nixos/system-report.nix;
      brrtfetch = import ./modules/nixos/brrtfetch.nix;
      rkn-block-checker = import ./modules/nixos/rkn-block-checker.nix;
    };

    homeManagerModules = {
      nixos-module-graph = import ./modules/home/nixos-module-graph.nix;
      nixos-health = import ./modules/home/nixos-health.nix;
      nixos-build-tui = import ./modules/home/nixos-build-tui.nix;
      nix-diff-lock = import ./modules/home/nix-diff-lock.nix;
      system-report = import ./modules/home/system-report.nix;
      brrtfetch = import ./modules/home/brrtfetch.nix;
      rkn-block-checker = import ./modules/home/rkn-block-checker.nix;
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
