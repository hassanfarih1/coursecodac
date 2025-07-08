// app/api/user/route.js (CECI EST LE FICHIER QUE VOUS DEVEZ CRÉER/RENOMMER)
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin'; // Assurez-vous que ce chemin est correct

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'L\'email est requis' }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 signifie "Aucune ligne trouvée"
      console.error('Erreur lors de la vérification de l\'utilisateur existant dans Supabase :', fetchError);
      return NextResponse.json({ error: 'Erreur de base de données lors de la vérification de l\'email.' }, { status: 500 });
    }

    if (existingUser) {
      // Retourner un message et un statut distincts pour "déjà abonné"
      return NextResponse.json({ message: 'Vous êtes déjà abonné !' }, { status: 200 });
    }

    // Insérer le nouvel email
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        { email: email }
      ])
      .select();

    if (error) {
      console.error('Erreur lors de l\'insertion du nouvel utilisateur dans Supabase :', error);
      if (error.code === '23505') { // Code d'erreur de violation d'unicité PostgreSQL
        return NextResponse.json({ error: 'Cet email est déjà abonné.' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Échec de l\'abonnement. Veuillez réessayer.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Merci de vous être abonné !' }, { status: 201 });

  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}