import Image from 'next/image';

async function getData() {
	// 模拟数据获取延迟
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return 'page2';
}

export default async function Home() {
	const data = await getData();

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			{data}
		</div>
	);
}
