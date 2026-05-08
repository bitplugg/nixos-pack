<<<<<<< HEAD
### THIS MY CUSTOM NIXOS ADD PACKAGES
##NOW RELEASED:
#brrtfetch(nix run github:bitplugg/nixos-pack#brrtfetch)
#rkn-check(nix run github:bitplugg/nixos-pack#rkn-block-checker)
||||||| parent of 2b97dae (upd readme)
=======
<img src="https://img.shields.io/badge/Nix-Flake-5277C3?logo=nixos&logoColor=white" height="24"/> <img src="https://img.shields.io/badge/x86__64--linux-supported-2ea44f"/> <img src="https://img.shields.io/github/license/bitplugg/nixos-pack"/>

# ❄️ nixos-pack

My personal **Nix flake** with a collection of custom packages — ready to use, easy to integrate.

```bash
nix run github:bitplugg/nixos-pack#brrtfetch
nix run github:bitplugg/nixos-pack#rkn-block-checker
```

## 📦 Packages

| Package | Description |
|---|---|
| **brrtfetch** | Render animated ASCII art from a GIF for your sysinfo fetcher of choice |
| **rkn-block-checker** | Diagnose RKN/TSPU internet blocks layer by layer |

### brrtfetch

Animated ASCII art fetcher. Give it a GIF, get back smooth ANSI animations for `neofetch` / `fastfetch` / whatever.

### rkn-block-checker

Multi-layer diagnostics tool for internet censorship (RKN/TSPU blocks). Tests connectivity at every layer: DNS → TCP → HTTP → TLS.

## 🚀 Usage

```bash
# Run directly
nix run github:bitplugg/nixos-pack#brrtfetch

# Add as a dependency in your flake.nix
{
  inputs.nixos-pack.url = "github:bitplugg/nixos-pack";

  outputs = { self, nixpkgs, nixos-pack, ... }: {
    nixosConfigurations.my-machine = nixpkgs.lib.nixosSystem {
      modules = [{
        environment.systemPackages = [
          nixos-pack.packages.${system}.brrtfetch
          nixos-pack.packages.${system}.rkn-block-checker
        ];
      }];
    };
  };
}
```

### Overlay

```nix
import nixos-pack.overlays.default  # adds brrtfetch & rkn-block-checker to pkgs
```

## 🧑‍💻 Maintainer

- [bitplugg](https://github.com/bitplugg)

## 📄 License

MIT
>>>>>>> 2b97dae (upd readme)
