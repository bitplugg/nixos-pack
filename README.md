<img src="https://img.shields.io/badge/Nix-Flake-5277C3?logo=nixos&logoColor=white" height="24"/> <img src="https://img.shields.io/badge/x86__64--linux-supported-2ea44f"/> <img src="https://img.shields.io/github/license/bitplugg/nixos-pack"/>

# ❄️ nixos-pack

My personal **Nix flake** with a collection of custom packages — ready to use, easy to integrate.

```bash
nix run github:bitplugg/nixos-pack#brrtfetch
nix run github:bitplugg/nixos-pack#nixos-module-graph -- --help
nix run github:bitplugg/nixos-pack#nixos-health
nix run github:bitplugg/nixos-pack#nix-diff-lock -- before.lock after.lock
```

## 📦 Packages

| Package | Description |
|---|---|
| **nixos-module-graph** | Analyse NixOS module import structure as a graph |
| **nixos-health** | Quick system health checks — channel age, disk, journal, DNS |
| **nixos-build-tui** | Minimal TUI wrapper around nixos-rebuild |
| **nix-diff-lock** | Human-readable diff for flake.lock files |
| **system-report** | JSON system inventory: packages, services, ports, mounts |
| **nixos-flake-update** | TUI for selectively updating flake inputs |
| **nixos-switch-diff** | Show package diff between current and candidate system |
| **nixos-clean** | Nix store GC TUI with generation overview |
| **nixos-log** | Journalctl browser with colored error/warning highlighting |
| **nixos-top** | Real-time system monitor: CPU, memory, systemd units |
| **brrtfetch** | Render animated ASCII art from a GIF for your sysinfo fetcher |
| **rkn-block-checker** | Diagnose RKN/TSPU internet blocks layer by layer |

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

## nixos-health

Quick health checks for a NixOS system — channel age, disk usage, journal errors, swap, DNS resolution, and more.

```bash
nixos-health
nixos-health --check journal
```

## nixos-build-tui

Minimal TUI wrapper around `nixos-rebuild`. Presents action selection, build log, rollback shortcut, and boot-entry management.

```bash
nixos-build-tui
```

## nix-diff-lock

Compares two `flake.lock` files and shows what inputs changed, what commits came in, and how many packages were added/removed.

```bash
nix-diff-lock old.lock new.lock
nix-diff-lock --json before.lock after.lock
```

## system-report

Collects system information into a single JSON document: installed packages, enabled systemd units, open ports, filesystem mounts, kernel parameters, and hardware info.

```bash
system-report
system-report --output report.json
```

## nixos-flake-update

Interactive TUI that reads your `flake.nix` inputs, shows current locked revisions, and lets you pick which inputs to update.

```bash
nixos-flake-update
```

## nixos-switch-diff

Builds a candidate system and diffs its store paths against the current generation — shows added, removed, or changed packages.

```bash
nixos-switch-diff
```

## nixos-clean

Shows generation overview and nix store size, then runs garbage collection. Supports `--dry-run` and `--full` (historical) modes.

```bash
nixos-clean
nixos-clean --dry-run
nixos-clean --full
```

## nixos-log

Wraps `journalctl` with syntax highlighting for errors (red), warnings (yellow), and service events (green).

```bash
nixos-log
nixos-log -u nginx --follow
nixos-log --boot -1 --priority err
```

## nixos-top

Live-updating dashboard showing load averages, memory usage, top systemd units by CPU, and recent journal errors.

```bash
nixos-top
nixos-top -n 5   # update every 5 seconds
```

## brrtfetch

Animated ASCII art fetcher. Give it a GIF, get back smooth ANSI animations for `neofetch` / `fastfetch` / whatever.

## rkn-block-checker

Multi-layer diagnostics tool for internet censorship (RKN/TSPU blocks). Tests connectivity at every layer: DNS → TCP → HTTP → TLS.

## 🚀 Usage as a dependency

### NixOS module (recommended)

Import a package as a NixOS module — it will be added to `environment.systemPackages` automatically:

```nix
{
  inputs.nixos-pack.url = "github:bitplugg/nixos-pack";

  outputs = { self, nixpkgs, nixos-pack, ... }: {
    nixosConfigurations.my-machine = nixpkgs.lib.nixosSystem {
      modules = [
        nixos-pack.nixosModules.nixos-health
        nixos-pack.nixosModules.nixos-module-graph
        nixos-pack.nixosModules.nixos-flake-update
        nixos-pack.nixosModules.nixos-switch-diff
        nixos-pack.nixosModules.nixos-clean
        nixos-pack.nixosModules.nixos-log
        nixos-pack.nixosModules.nixos-top
        nixos-pack.nixosModules.system-report
      ];
    };
  };
}
```

### Home-Manager module

```nix
{
  imports = [ nixos-pack.homeManagerModules.nix-diff-lock ];
  # or in home-manager's extraSpecialArgs:
  home-manager.users.myuser = { pkgs, ... }: {
    imports = [ inputs.nixos-pack.homeManagerModules.brrtfetch ];
  };
}
```

### Manual package + overlay

```nix
{
  inputs.nixos-pack.url = "github:bitplugg/nixos-pack";

  outputs = { self, nixpkgs, nixos-pack, ... }: {
    nixosConfigurations.my-machine = nixpkgs.lib.nixosSystem {
      modules = [
        nixos-pack.overlays.default  # adds all packages to pkgs
        {
          environment.systemPackages = with pkgs; [
            nixos-health
            nixos-module-graph
            system-report
          ];
        }
      ];
    };
  };
}
```

### nix profile

```bash
nix profile install github:bitplugg/nixos-pack#nixos-module-graph
```

## 🧑‍💻 Maintainer

- [bitplugg](https://github.com/bitplugg) — zxckillka.off@gmail.com

## 📄 License

MIT
