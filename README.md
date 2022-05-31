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

## Using it on PULL REQUEST events
Suggested file name: `.github/workflows/qe-pull-request.yml`

```yaml
name: '[PRN] Quality Engineering'

on:
  pull_request:
    branches: 
      - main
      - master
  pull_request_target:
    branches: 
      - main
      - master
    types:
      - labeled

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@main
    with:
      danger: true
      dangerRequireChangelog: false
      nodeLint: true
      nodeTest: true
      nodeSonar: true
      cypress: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      sonarToken: ${{ secrets.SONAR_TOKEN }}
      cypressJson: ${{ secrets.VTEX_QE }}
```

## Using it on SCHEDULE events
Suggested file name: `.github/workflows/qe-schedule.yml`

```yaml
name: '[SCH] Quality Engineering'

on:
  schedule:
    - cron: '30 7 * * MON-FRI'

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@main
    with:
      cypress: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      cypressJson: ${{ secrets.VTEX_QE }}
```
