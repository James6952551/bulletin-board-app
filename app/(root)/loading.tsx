import { Dots } from "./_component/ui/Dots";

export default function Loading() {
  return <div className="flex justify-center">
    <div className="space-y-6">
      <Dots className="w-20"/> 
      <p>Loading...</p>
    </div>
  </div>

}