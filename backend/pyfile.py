import docx

template_path = "C:/Users/user/Documents/Qt-projects/Fileprocessor/template.docx"
document = docx.Document(template_path)

save_path = f'C:/Users/user/Downloads/invoice_{"invoice.id"}.docx'
document.save(save_path)