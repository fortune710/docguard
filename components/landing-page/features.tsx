import { BellRing, QrCode, SquareStack, UploadCloud,  } from "lucide-react";


const features = [
  {
    name: 'Notifications on Expiry',
    description:
      'Get Notifications on when documents are about to expire, ahead of time. You should not have to carry expired credentials.',
    icon: BellRing,
  },
  {
    name: 'Seamless Uploads',
    description:
      'Upload your documents via image or files. Let our AI model handle the rest for you.',
    icon: UploadCloud,
  },
  {
    name: 'QR Code Retrieval',
    description:
      'Help others view your documents much easier. You should not have to download every single time.',
    icon: QrCode,
  },
  {
    name: 'Document Groups',
    description:
      'Group your documents into different categories. Find what you are looking for faster.',
    icon: SquareStack,
  },
]

export default function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Be more efficient</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Identity, all in a login.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-9 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
