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
      default = self.packages.${system}.brrtfetch;
    };

    # Если хочешь, можно сразу добавить оверлей для удобства
    overlays.default = final: prev: {
      brrtfetch = final.callPackage ./pkgs/brrtfetch {};
      rkn-block-checker = final.callPackage ./pkgs/rkn-block-checker {};
    };
  };
}
