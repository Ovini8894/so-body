const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const bodies = await prisma.category.upsert({
        where: { name: 'Bodies' },
        update: {},
        create: {
            name: 'Bodies',
            icon: '👚',
            color: '#FF6B9D',
        },
    });

    const bolsas = await prisma.category.upsert({
        where: { name: 'Bolsas' },
        update: {},
        create: {
            name: 'Bolsas',
            icon: '👜',
            color: '#C9A961',
        },
    });

    const vestidos = await prisma.category.upsert({
        where: { name: 'Vestidos' },
        update: {},
        create: {
            name: 'Vestidos',
            icon: '👗',
            color: '#9D5C63',
        },
    });

    const acessorios = await prisma.category.upsert({
        where: { name: 'Acessórios' },
        update: {},
        create: {
            name: 'Acessórios',
            icon: '💍',
            color: '#D4AF37',
        },
    });

    console.log('Categorias criadas:', { bodies, bolsas, vestidos, acessorios });

    // Create Products
    const bodyPreto = await prisma.product.create({
        data: {
            name: 'Body Preto Básico',
            description: 'Body básico preto, perfeito para qualquer ocasião. Tecido confortável e elástico.',
            price: 89.90,
            image: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=Body+Preto',
            stock: 50,
            categoryId: bodies.id,
        },
    });

    const bodyBranco = await prisma.product.create({
        data: {
            name: 'Body Branco Decote',
            description: 'Body branco com decote elegante. Ideal para looks sofisticados.',
            price: 94.90,
            image: 'https://via.placeholder.com/400x500/FFFFFF/000000?text=Body+Branco',
            stock: 45,
            categoryId: bodies.id,
        },
    });

    const bolsaCaramelo = await prisma.product.create({
        data: {
            name: 'Bolsa Caramelo',
            description: 'Bolsa média em couro sintético cor caramelo. Alça ajustável.',
            price: 149.90,
            image: 'https://via.placeholder.com/400x500/D2691E/FFFFFF?text=Bolsa+Caramelo',
            stock: 30,
            categoryId: bolsas.id,
        },
    });

    const bolsaPreta = await prisma.product.create({
        data: {
            name: 'Bolsa Preta Grande',
            description: 'Bolsa grande preta com vários compartimentos. Perfeita para o dia a dia.',
            price: 179.90,
            image: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=Bolsa+Preta',
            stock: 25,
            categoryId: bolsas.id,
        },
    });

    const vestidoFloral = await prisma.product.create({
        data: {
            name: 'Vestido Floral',
            description: 'Vestido midi com estampa floral delicada. Tecido leve e fluido.',
            price: 129.90,
            image: 'https://via.placeholder.com/400x500/FFB6C1/FFFFFF?text=Vestido+Floral',
            stock: 35,
            categoryId: vestidos.id,
        },
    });

    const vestidoPreto = await prisma.product.create({
        data: {
            name: 'Vestido Longo Preto',
            description: 'Vestido longo preto elegante. Perfeito para eventos noturnos.',
            price: 159.90,
            image: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=Vestido+Preto',
            stock: 20,
            categoryId: vestidos.id,
        },
    });

    const brincos = await prisma.product.create({
        data: {
            name: 'Conjunto de Brincos Dourados',
            description: 'Set com 3 pares de brincos dourados. Hipoalergênicos.',
            price: 39.90,
            image: 'https://via.placeholder.com/400x500/FFD700/000000?text=Brincos',
            stock: 100,
            categoryId: acessorios.id,
        },
    });

    const cinto = await prisma.product.create({
        data: {
            name: 'Cinto Fivela Dourada',
            description: 'Cinto em couro sintético com fivela dourada. Ajustável.',
            price: 49.90,
            image: 'https://via.placeholder.com/400x500/8B4513/FFFFFF?text=Cinto',
            stock: 60,
            categoryId: acessorios.id,
        },
    });

    console.log('Produtos criados com sucesso!');
    console.log(`Total: ${8} produtos em ${4} categorias`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log('Seed concluído!');
    })
    .catch(async (e) => {
        console.error('Erro ao executar seed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
