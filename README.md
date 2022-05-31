# US Regional Product - Reusable Workflows

The Quality Engineering Team from US Regional Product creates those workflows to use between all projects related.

## Using it on PUSH events
Suggested file name: `.github/workflows/qe-push.yml`

```yaml
name: '[PSH] Quality Engineering'

on:
  push:
    branches: 
      - master
      - main
      - bugfix/*
      - chore/*
      - enhancement/*
      - feature/*
      - fix/*
      - hotfix/*
      - translation/*
      - actions/*

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@main
    with:
      nodeSonar: true
      nodeLint: true
      nodeTest: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      sonarToken: ${{ secrets.SONAR_TOKEN }}
```

