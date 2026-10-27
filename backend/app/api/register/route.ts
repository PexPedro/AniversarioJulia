import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
     return NextResponse.json({ error: 'Preencha todos os campos!' }, { status: 400 });
  }

  try {
    // Embaralha a senha do novo convidado
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Salva no banco de dados
    await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // Se der erro, geralmente é porque o nome de usuário já existe
    return NextResponse.json({ error: 'Esse usuário já existe. Escolha outro!' }, { status: 400 });
  }
}