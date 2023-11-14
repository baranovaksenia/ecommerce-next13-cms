import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name } = body;

		// require from store Model (id - uuid(), name, userId)
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}
		if (!name) {
			return new NextResponse('Укажите имя', { status: 400 })
		}
		// create new store. userId - clerk auth id; name - request body 
		const store = await prismadb.store.create({
			data: {
				name,
				userId,
			},
		})

		return NextResponse.json(store)
	} catch (err) {
		console.log('[STORES_POST]', err)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}