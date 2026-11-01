import json
from pathlib import Path
from app import parse_report,normalize_record
for count,total in [(5,322000),(3,100),(0,0)]:
 r=json.loads(Path('exemplo.json').read_text(encoding='utf-8'))
 r['Supplies']=[{'Item':'Charm Boost','Count':count,'Unit price':'Variable','Total price':total}]
 p=parse_report(r)
 i=next(i for i in p['items'] if i['kind']=='supply')
 assert i['total']==total
 assert p['supplies']==total
 i['price']=999
 assert normalize_record(p)['supplies']==total
print('Custos progressivos: total exato preservado, inclusive arredondamento e preço personalizado.')