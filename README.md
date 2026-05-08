<img src="https://img.shields.io/badge/Nix-Flake-5277C3?logo=nixos&logoColor=white" height="24"/> <img src="https://img.shields.io/badge/x86__64--linux-supported-2ea44f"/> <img src="https://img.shields.io/github/license/bitplugg/nixos-pack"/>

# ❄️ nixos-pack

My personal **Nix flake** with a collection of custom packages — ready to use, easy to integrate.

```bash
nix run github:bitplugg/nixos-pack#brrtfetch
nix run github:bitplugg/nixos-pack#rkn-block-checker
nix run github:bitplugg/nixos-pack#nixos-module-graph -- --help
```

## 📦 Packages

| Package | Description |
|---|---|
| **brrtfetch** | Render animated ASCII art from a GIF for your sysinfo fetcher of choice |
| **rkn-block-checker** | Diagnose RKN/TSPU internet blocks layer by layer |
| **nixos-module-graph** | Analyse NixOS module import structure as a graph |

---

## nixos-module-graph

Analyse NixOS module imports and build a visual graph of dependencies.  
Supports HTML (d3.js), DOT (Graphviz), JSON, and ASCII text output.

```bash
# From a config file — full import DAG
nixos-module-graph --config /etc/nixos/configuration.nix --output graph.html
nixos-module-graph --config /etc/nixos/configuration.nix --text
nixos-module-graph --config /etc/nixos/configuration.nix --output deps.dot

# Interactive web server with d3.js
nixos-module-graph --config ./configuration.nix --serve --port 8080

# Analyse a specific option — see which modules declare/define it
nixos-module-graph --config /etc/nixos/configuration.nix --option services.nginx.enable

# From a flake — option-based analysis
nixos-module-graph --flake .#my-server --output graph.html
nixos-module-graph --flake .#my-server --option services.nginx.enable --text
```

### Output formats

| Format | Ext | Description |
|---|---|---|
| HTML | `.html` | Interactive force-directed graph with d3.js — zoom, pan, click for details |
| DOT | `.dot` | Graphviz format — render with `dot -Tpng graph.dot -o graph.png` |
| JSON | `.json` | Machine-readable module list, edges, and option info |
| Text | `--text` | ASCII tree in terminal |

### Option analysis

When `--option` is given, the tool traces where that option is **declared** and **defined** across all modules — useful for debugging conflicts and `mkForce`/`mkDefault` chains.

```bash
nixos-module-graph --config /etc/nixos/configuration.nix --option services.openssh.enable --json
```

### Interpreting the graph

- **Green nodes** — nixpkgs modules
- **Blue nodes** — user modules
- **Red nodes** — cycles or errors
- **Edges** — direction of `imports = [ … ]`
- **Click** any node to see its declared options
- **Hover** or zoom to explore

---

## brrtfetch

Animated ASCII art fetcher. Give it a GIF, get back smooth ANSI animations for `neofetch` / `fastfetch` / whatever.

## rkn-block-checker

Multi-layer diagnostics tool for internet censorship (RKN/TSPU blocks). Tests connectivity at every layer: DNS → TCP → HTTP → TLS.

## 🚀 Usage as a dependency

```nix
{
  inputs.nixos-pack.url = "github:bitplugg/nixos-pack";

  outputs = { self, nixpkgs, nixos-pack, ... }: {
    nixosConfigurations.my-machine = nixpkgs.lib.nixosSystem {
      modules = [{
        environment.systemPackages = [
          nixos-pack.packages.${system}.nixos-module-graph
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
import nixos-pack.overlays.default  # adds all packages to pkgs
```

### nix profile

```bash
nix profile install github:bitplugg/nixos-pack#nixos-module-graph
```

## 🧑‍💻 Maintainer

- [bitplugg](https://github.com/bitplugg) — zxckillka.off@gmail.com

## 📄 License

MIT
