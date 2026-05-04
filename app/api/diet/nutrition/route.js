import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const APP_ID = process.env.EDAMAM_APP_ID || 'demo_id';
  const APP_KEY = process.env.EDAMAM_APP_KEY || 'demo_key';

  try {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(query)}`
    );
    
    const data = await response.json();

    if (data.calories !== undefined) {
      return NextResponse.json({
        calories: Math.round(data.calories),
        protein: Math.round(data.totalNutrients?.PROCNT?.quantity || 0),
        label: data.ingredients?.[0]?.parsed?.[0]?.food || query
      });
    }

    return NextResponse.json({ error: "Could not find nutrition data" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from nutrition API" }, { status: 500 });
  }
}
