"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ExternalLink, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/contexts/favorites-context"
import { FavoriteIcon } from "./favorite-icon"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "./ui/image-with-fallback"

export type RecommendationItem = {
  name: string
  reason: string
  features: string[]
  imageUrl: string
  officialUrl: string
}

export type RecommendationsData = {
  artists: RecommendationItem[]
  celebrities: RecommendationItem[]
  media: RecommendationItem[]
  fashion: RecommendationItem[]
}

type CategoryMapping = {
  artists: string
  celebrities: string
  media: string
  fashion: string
}

const categoryTitles: CategoryMapping = {
  artists: "アーティスト",
  celebrities: "芸能人/インフルエンサー",
  media: "映画/アニメ",
  fashion: "ファッションブランド",
}

export function Recommendations({
  data,
  searchTerm,
}: {
  data: RecommendationsData
  searchTerm: string
}) {
  const router = useRouter()
  const { isFavorite } = useFavorites()
  const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleItemClick = (item: RecommendationItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  // おすすめ検索を実行する関数
  const handleRecommendedSearch = () => {
    if (selectedItem) {
      // ダイアログを閉じる
      setIsDialogOpen(false)

      // 検索ページに遷移して自動的に検索を実行
      router.push(`/search?q=${encodeURIComponent(selectedItem.name)}`)
    }
  }

  return (
    <div className="space-y-8">
      {(Object.keys(data) as Array<keyof RecommendationsData>).map((category) => {
        // 各カテゴリーの最初の5つのアイテムのみを表示
        const displayItems = data[category].slice(0, 5)

        if (displayItems.length === 0) return null

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{categoryTitles[category]}</h3>
              <Link
                href={`/category/${category}?q=${encodeURIComponent(searchTerm)}`}
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                すべて見る <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayItems.map((item, index) => (
                <div key={item.name} className="cursor-pointer" onClick={() => handleItemClick(item)}>
                  <div className="relative bg-gray-100 rounded-md overflow-hidden">
                    <div className="aspect-square relative">
                      <ImageWithFallback
                        src={item.imageUrl || "/placeholder.svg?height=400&width=400"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        loading={index < 2 ? "eager" : "lazy"}
                        fallbackText={item.name.substring(0, 2)}
                        identifier={item.name}
                      />
                      <div className="absolute top-2 right-2">
                        <FavoriteIcon item={item} />
                      </div>
                    </div>
                    <div className="p-2">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 h-10">{item.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedItem && (
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedItem.name}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-4">
              <div className="space-y-4">
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <ImageWithFallback
                    src={selectedItem.imageUrl || "/placeholder.svg?height=400&width=400"}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                    fallbackText={selectedItem.name.substring(0, 2)}
                    identifier={selectedItem.name}
                  />
                  <div className="absolute top-2 right-2">
                    <FavoriteIcon item={selectedItem} size="lg" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">提案理由</h3>
                  <p className="text-muted-foreground">{selectedItem.reason}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">特徴</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {selectedItem.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">公式サイト</h3>
                  <a
                    href={selectedItem.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    {selectedItem.officialUrl.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={handleRecommendedSearch} className="w-full bg-[#454545] hover:bg-[#454545]/90">
                <Search className="mr-2 h-4 w-4" />「{selectedItem.name}」で検索
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

