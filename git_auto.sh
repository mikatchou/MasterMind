#!/bin/bash

# Chemin vers votre répertoire Git
repository_path="/c/Users/mika/OneDrive/Documents/exercice-algo/mastermind"

# Message de commit (personnalisable)
commit_message="Commit automatique"

# Déplacement vers le répertoire Git
cd "$repository_path"

# Ajout de tous les fichiers modifiés et supprimés
git add -A

# Commit des modifications avec le message spécifié
git commit -m "$commit_message"

# Push des modifications vers le dépôt distant
git push

# Message de confirmation
echo "Les modifications ont été ajoutées, committées et poussées avec succès."
