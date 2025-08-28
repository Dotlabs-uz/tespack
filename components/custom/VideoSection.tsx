export default function VideoSection() {
    return (
        <section className="w-full flex justify-center items-center py-10 px-4 relative">
            <div className="absolute inset-x-0 top-20 bottom-20 bg-[#03156B] -z-10"></div>
            <div className="w-full max-w-5xl relative rounded-3xl overflow-hidden shadow-lg">
                <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </section>
    );
}