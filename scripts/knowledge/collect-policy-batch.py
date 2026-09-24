"""Collect one checkpointed policy batch; merge only after all writers finish."""
import argparse
import importlib.util
import json
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--targets', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()
spec = importlib.util.spec_from_file_location('collector', Path(__file__).with_name('collect-policy-documents.py'))
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)
output = Path(args.output)
previous = json.loads(output.read_text(encoding='utf-8'))['results'] if output.exists() else []
results = []
for target in json.loads(Path(args.targets).read_text(encoding='utf-8')):
    link = target[1]
    cached = next((row for row in previous if row.get('receipt') and row['url']==link['url'] and row['receipt'].get('request_form')==link.get('form')),None)
    results.append(cached or collector.collect(target))
    output.write_text(json.dumps({'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
    if not cached or len(results)%25==0:
        print(json.dumps({'checked':len(results),'collected':sum('receipt' in r for r in results)}),flush=True)
