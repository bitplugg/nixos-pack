{ pkgs, lib, python3 }:

python3.pkgs.buildPythonApplication rec {
  pname = "rkn-block-checker";
  version = "latest";
  pyproject = true;

  src = pkgs.fetchFromGitHub {
    owner = "MayersScott";
    repo = pname;
    rev = "main";  # ← для стабильности укажи конкретный коммит
    hash = "sha256-gfyrZI2oC/e2wjhhfFh/LW7/7UQ5ogZ7dLoqTJrDESY=";  # ← после первой сборки подставь правильный хэш
  };

  build-system = with python3.pkgs; [ setuptools ];
  dependencies = with python3.pkgs; [ requests ];

  meta = with lib; {
    description = "Diagnose RKN/TSPU internet blocks layer by layer";
    homepage = "https://github.com/MayersScott/rkn-block-checker";
    license = licenses.mit;
    mainProgram = "rkn-check";
    platforms = platforms.all;
  };
}
