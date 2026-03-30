from .config import Settings, get_secrets

secrets = get_secrets()
settings = Settings(**secrets)