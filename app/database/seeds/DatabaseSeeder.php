<?php


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
      User::create([
        'displayName' => 'Antonio',
        'email' => 'antonio@hackages.io',
        'photoURL' => 'test.jpg',
        'password' => \Bcrypt\hash('lala')
      ]);
    }
}
