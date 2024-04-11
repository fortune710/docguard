import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Documents } from "@/server/types"
import FileUpload from "../home/file-upload"
import { DocumentLink } from "./document-link"

interface DocumentsTableProps {
    documents: Documents
}

const PAGINATION_LIMIT = 10;

export default function DocumentsTable({ documents }: DocumentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
            <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                    Your Documents Listed by Upload Date.
                </CardDescription>
            </div>

            <FileUpload/>
        </div>    
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">
                Expiry Date
              </TableHead>
              <TableHead className="hidden md:table-cell">Uploaded At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                documents.map((document) => (
                    <TableRow key={document.id}>
                        <TableCell className="font-medium">
                            {document.title}
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{document.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{document.description}</TableCell>
                        <TableCell className="hidden md:table-cell">{document.expiry_date?.toDateString() || ""}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            {document.createdAt.toDateString() || ""}
                        </TableCell>

                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DocumentLink fileKey={document.file_key}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>

                ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{documents.length < PAGINATION_LIMIT ? documents.length : PAGINATION_LIMIT}</strong> of <strong>{documents.length}</strong> documents
        </div>
      </CardFooter>
    </Card>
  )
}
