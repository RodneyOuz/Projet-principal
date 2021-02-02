import React from 'react';

const tasks = [
  {text: 'Se connecter', done: true},
  {text: 'Se déconnecter', done: true},
  {text: 'Modifier ses informations', done: true},
  {text: 'Ajouter/modifier/effacer des informations dans les 2 tables', done: true},
  {text: 'Supprimer mon compte et ses données', done: true},
  {text: 'Communiquer avec l\'administrateur', done: true},
  {text: 'En tant qu\'admin je peux éditer les clients', done: true},
  {text: 'Reset le password d\'un  utilisateur', done: true},
  {text: "Supprimer un client", done: true},
  {text: "Ajouter du contenu", done: true},
  {text: "Editer du contenu", done: true},
  {text: "Sécuriser les accès au site", done: true},
  {text: "Protéger la base de données contre les injections", done: true},
  {text: "Les données entrées sont vérifiées", done: true},
  {text: "Un utilisateur non loguée n'a pas accès aux données du site", done: true}
];

export const Landing = () =>
  <div>
    <h1>Site PHP - Projet de 2nd année - Verhaverbeke Antonio</h1>
    <h2>Cahier de charges</h2>
    <table className="striped">
      <thead>
      <tr>
        <th>Tâche</th>
        <th>Fait</th>
      </tr>
      </thead>

      <tbody>
      {tasks.map((task, i) =>
        <tr key={i}>
          <td>{task.text}</td>
          <td>{task.done ? '✅':'❌'}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
