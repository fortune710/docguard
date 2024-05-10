"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Documents } from "@/server/types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DocumentLink } from "./document-link"
import DeleteDocumentDialog from "../dialogs/delete-document-dialog"
import { useState } from "react"

  
interface DocumentsTableProps {
    documents: Documents
}

export default function DocumentsTable({ documents }: DocumentsTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
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
                                    <DropdownMenuItem 
                                        onClick={() => setDialogOpen(true)}
                                        className="text-red-600"
                                    >
                                        Delete Document
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DeleteDocumentDialog 
                                documentId={document.id}
                                open={dialogOpen}
                                onOpenChange={(open) => setDialogOpen(open)}
                            />
                        </TableCell>
                    </TableRow>

                ))
            }
            </TableBody>
        </Table>
    )
}