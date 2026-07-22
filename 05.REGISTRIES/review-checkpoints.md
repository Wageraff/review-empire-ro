# Review Checkpoints Configuration

> Когда Cursor останавливается на ревью в batch workflow.

## Current mode: strict (стартовый)

```yaml
mode: strict
checkpoints:
  after_seo_plans: true
  after_copy_drafts: true
  after_linguist_check: true
  final_approval: true   # всегда true!
```

## Доступные режимы

### strict (по умолчанию, первые 3-4 batch'а)

Все чекпоинты включены. Максимальный контроль.

### medium (после 5-10 успешных batch'ей)

```yaml
mode: medium
checkpoints:
  after_seo_plans: true
  after_copy_drafts: false
  after_linguist_check: false
  final_approval: true
```

### fast (когда доверяете Cursor)

```yaml
mode: fast
checkpoints:
  after_seo_plans: false
  after_copy_drafts: false
  after_linguist_check: false
  final_approval: true
```

### custom (per type)

```yaml
mode: custom
per_type:
  review: fast
  bonus-page: fast
  guide-page: medium
  comparison: strict
```

## Команды переключения

```
switch checkpoint mode to <mode>
set checkpoint mode for <page-type> to <mode>
```

## История

- 2026-07-14: strict (v4 migration)
